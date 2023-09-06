export const CHANNEL_TYPE = {
  TEXT: "Text",
  AUDIO: "Audio",
  VIDEO: "Video",
};

export const CHANNEL_TITLE = {
  [CHANNEL_TYPE.TEXT]: "Text channels",
  [CHANNEL_TYPE.AUDIO]: "Audio channels",
  [CHANNEL_TYPE.VIDEO]: "Video channels",
};

export const LIST_CHANNEL_TYPES = [
  {
    id: CHANNEL_TYPE.TEXT,
    name: CHANNEL_TYPE.TEXT,
  },
  {
    id: CHANNEL_TYPE.AUDIO,
    name: CHANNEL_TYPE.AUDIO,
  },
  {
    id: CHANNEL_TYPE.VIDEO,
    name: CHANNEL_TYPE.VIDEO,
  },
];
