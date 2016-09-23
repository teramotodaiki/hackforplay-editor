const HINT_ELEMENT_CLASS_SNIPPET = 'CodeMirror-hint-snippet';

class Snippet {
  constructor(settings) {
    Object.assign(this, settings);

    this.className = HINT_ELEMENT_CLASS_SNIPPET +
      (this.className ? ' ' + this.className : '');
  }

  render(element, self, data) {
    element.textContent = data.displayText;
    return element;

  }

  hint(instance, self, data) {
    instance.replaceRange(data.text, self.from, self.to, 'complete');
    if (typeof data.selections === 'function') {
      instance.setSelections(data.selections(self.from));
    }
    const length = data.text.split('\n').length;
    Array.from({ length }).forEach((v, i) => instance.indentLine(i + self.from.line));
  }

}

module.exports = Snippet;
