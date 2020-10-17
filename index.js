const { Plugin } = require('powercord/entities');
const { getModule } = require('powercord/webpack');


module.exports = class StereoCord extends Plugin {
  startPlugin () {
    this.VoiceConnection = getModule([ 'getVoiceEngine' ], false).getVoiceEngine().VoiceConnection;
    class Stereo extends this.VoiceConnection {
      constructor (a, b, c, d, e) {
        super(a, b, c, d, e);
        this.origin = super.setTransportOptions;
      }

      setTransportOptions (obj) {
        console.log(obj)
        if (obj.audioEncoder) {
          obj.audioEncoder.params = { stereo: '1' };
          obj.audioEncoder.channels = 2;
        }
        if (obj.fec) {
          obj.fec = false;
        }
        if (obj.encodingVoiceBitRate < 448000) {
          obj.encodingVoiceBitRate = 448000;
        }


        this.origin(obj);
        window.sound = this;
      }
    }
    getModule([ 'getVoiceEngine' ], false).getVoiceEngine().VoiceConnection = Stereo;
  }

  pluginWillUnload () {
    getModule([ 'getVoiceEngine' ], false).getVoiceEngine().VoiceConnection = this.VoiceConnection;
  }
};
