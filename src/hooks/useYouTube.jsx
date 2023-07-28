const useYouTube = () => {
  const isYouTubeVideoExists = (id, onUpdate) => {
    if (!id || id === "") {
      onUpdate(false);
      return;
    }
    let img = new Image();
    img.src = "http://img.youtube.com/vi/" + id + "/mqdefault.jpg";
    img.onload = () => {
      onUpdate(img.width > 120);
    };
    img.onerror = () => {
      onUpdate(false);
    };
  };

  return { isYouTubeVideoExists };
};

export default useYouTube;
