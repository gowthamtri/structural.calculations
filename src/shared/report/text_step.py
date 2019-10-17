from .step import Step

class TextStep(Step):
    def __init__(self, text):
        super().__init__()
        self._text = text
    
    @property
    def text(self):
        return self._text

    def __json__(self):
        return {
            'text': self.text
        }

    for_json = __json__
