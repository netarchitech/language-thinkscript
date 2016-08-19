'use babel';

import LanguageThinkscriptView from './language-thinkscript-view';
import { CompositeDisposable } from 'atom';

export default {

  languageThinkscriptView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.languageThinkscriptView = new LanguageThinkscriptView(state.languageThinkscriptViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.languageThinkscriptView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'language-thinkscript:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.languageThinkscriptView.destroy();
  },

  serialize() {
    return {
      languageThinkscriptViewState: this.languageThinkscriptView.serialize()
    };
  },

  toggle() {
    console.log('LanguageThinkscript was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
