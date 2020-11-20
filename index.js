const { Plugin } = require('powercord/entities');
const { getModule } = require('powercord/webpack');


module.exports = class StereoCord extends Plugin {
  startPlugin () {
    this.VoiceConnection = getModule([ 'getVoiceEngine' ], false).getVoiceEngine().VoiceConnection;
    class Stereo extends this.VoiceConnection {
      setTransportOptions (obj) {
        console.log('setTransportOptions called:', obj);
        if (obj.audioEncoder) {
          obj.audioEncoder.params = { stereo: '2' };
          obj.audioEncoder.channels = 2;
        }
        if (obj.fec) {
          obj.fec = false;
        }
        if (obj.encodingVoiceBitRate < 448000) {
          obj.encodingVoiceBitRate = 448000;
        }
        super.setTransportOptions(obj);
      }
    }
    getModule([ 'getVoiceEngine' ], false).getVoiceEngine().VoiceConnection = Stereo;
  }

  pluginWillUnload () {
    getModule([ 'getVoiceEngine' ], false).getVoiceEngine().VoiceConnection = this.VoiceConnection;
  }
};
