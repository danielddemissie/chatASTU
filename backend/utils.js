module.exports = {
  sendData: (res, msg, data) => {
    return res.send({
      message: msg,
      Data: data,
    });
  },

  consoleError: (msg) => {
    console.error(Error(msg));
  },
};
