import useSound from "use-sound";

const useAudio = (src, hookOptions) => {
  const [play, exposedData] = useSound(src, {
    ...hookOptions,
    volume: JSON.parse(localStorage.getItem("soundFx"))
      ? hookOptions?.volume
        ? hookOptions.volume
        : 1
      : 0,
  });

  return [play, exposedData];
};

export default useAudio;
