'use babel';

import DingdongSlotView from './dingdong-slot-view';
import { CompositeDisposable } from 'atom';

export default {

  dingdongSlotView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.dingdongSlotView = new DingdongSlotView(state.dingdongSlotViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.dingdongSlotView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'dingdong-slot:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.dingdongSlotView.destroy();
  },

  serialize() {
    return {
      dingdongSlotViewState: this.dingdongSlotView.serialize()
    };
  },

  toggle() {
    console.log('DingdongSlot was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
