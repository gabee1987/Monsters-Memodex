const encodeSVG = (svg) => {
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
};

export const insertBackgroundCSSClass = (className, svg, color) => {
  const styleSheetId = `dynamic-background-style-${className}`;
  let styleSheet = document.getElementById(styleSheetId);

  if (!styleSheet) {
    styleSheet = document.createElement('style');
    styleSheet.id = styleSheetId;
    styleSheet.type = 'text/css';
    document.head.appendChild(styleSheet);
  }

  let cssRule = '';
  if (svg) {
    cssRule = `
    .app-background.${className} {
      background-image: url("${svg}");
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;
    }
  `;
  } else {
    cssRule = `
    .app-background.${className} {
      background-color: ${color};
    }
  `;
  }

  styleSheet.innerHTML = cssRule;
};
