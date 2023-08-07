const rippleConfig = {
  color: 'rgba(150, 150, 150, 0.5)',
  borderless: false,
  foreground: false,
};

const getRippleConfig = (
  color = 'rgba(150, 150, 150, 0.5)',
  borderless = false,
  foreground = false,
) => {
  return {
    color,
    borderless,
    foreground,
  };
};

export {rippleConfig, getRippleConfig};
