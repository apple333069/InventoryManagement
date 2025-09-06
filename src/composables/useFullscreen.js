export function useFullscreen() {
  const fullscreenElement = ref(null);
  const isFullscreen = ref(false);

  const toggleFullscreen = async () => {
    if (!document.fullscreenElement) {
      await fullscreenElement.value?.requestFullscreen();
      isFullscreen.value = true;
    } else {
      await document.exitFullscreen();
      isFullscreen.value = false;
    }
    setTimeout(() => {
      fullscreenElement.value.resize();
    }, 100);
  };
  
  document.addEventListener('fullscreenchange', () => {
    isFullscreen.value = !!document.fullscreenElement;
    setTimeout(() => {
      if (fullscreenElement.value) {
        fullscreenElement.value.resize();
      }
    }, 100);
  });

  return {
    fullscreenElement,
    isFullscreen,
    toggleFullscreen,
  };
}