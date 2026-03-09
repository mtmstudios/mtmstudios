

## Analyse

Das Problem ist klar: `react-icon-cloud` nutzt intern `TagCanvas`, das die Icons als Bilder auf ein HTML5 Canvas rendert. Die Icons werden zur Laufzeit von `cdn.jsdelivr.net` geladen (`fetchSimpleIcons`). Auf der Live-Domain schlaegt dieser Fetch fehl oder ist zu langsam - das Canvas startet und rotiert (daher "bewegt sich"), aber ohne geladene Icons zeigt TagCanvas "no tags".

**Warum es in der Preview funktioniert**: Die Preview-Domain hat keine CSP-Einschraenkungen und laedt die Icons problemlos. Auf der Published Domain (`mtmstudios.lovable.app`) kann es zu Timing-Problemen oder CDN-Blockierungen kommen.

## Loesung

Die bestehende `react-icon-cloud`-Komponente beibehalten (gleiches Design, gleiche Bewegung), aber robuster machen:

### 1. Retry-Logik fuer `fetchSimpleIcons`
In `src/components/ui/interactive-icon-cloud.tsx` den `useEffect` erweitern: Wenn der Fetch fehlschlaegt, bis zu 3 Mal mit Verzoegerung erneut versuchen.

### 2. Ladestate verhindern leeres Canvas
Das `<Cloud>` erst rendern, wenn die Icons tatsaechlich geladen sind. Solange die Daten noch nicht da sind, einen leeren Container mit gleicher Hoehe anzeigen, damit kein leeres rotierendes Canvas ohne Tags erscheint.

### Dateien
- `src/components/ui/interactive-icon-cloud.tsx` - Retry-Logik und bedingtes Rendering hinzufuegen

### Technisches Detail
```
// Statt:
useEffect(() => {
  fetchSimpleIcons({ slugs: iconSlugs }).then(setData)
}, [iconSlugs])

// Wird:
useEffect(() => {
  let attempts = 0;
  const load = () => {
    fetchSimpleIcons({ slugs: iconSlugs })
      .then(setData)
      .catch(() => {
        if (attempts < 3) { attempts++; setTimeout(load, 1000 * attempts); }
      });
  };
  load();
}, [iconSlugs])

// Und Cloud nur rendern wenn data vorhanden:
if (!renderedIcons) return <div style={{ minHeight: 300 }} />;
```

Das Design und die Bewegung bleiben exakt gleich - es wird nur sichergestellt, dass die Icons zuverlaessig geladen werden und kein leeres Canvas angezeigt wird.

