const getByteSize = (size: number) => {
  if (size < 500000) {
    return (size / 1024).toFixed(0) + "KB";
  }
  return (size / 1048576).toFixed(2) + "MB";
};

export {
  getByteSize,
};
