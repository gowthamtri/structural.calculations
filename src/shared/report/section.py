from .text_step import TextStep
from .equation_step import EquationStep
from .table_step import TableStep

class Section(object):
    def __init__(self, header):
        self._header = header
        self._steps = []
    
    @property
    def header(self):
        return self._header

    @property
    def steps(self):
        return self._steps

    def new_text_step(self, text):
        step = TextStep(text)
        self._steps.append(step)

    def new_equation_step(self, symbol, description, expr, value, unit):
        step = EquationStep(symbol, description, expr, value, unit)
        self._steps.append(step)
    
    def new_table(self) -> TableStep:
        step = TableStep()
        self._steps.append(step)
        return step

    def __json__(self):
        return {
            'header': self.header,
            'steps': [ x.__json__() for x in self.steps]
        }

    for_json = __json__