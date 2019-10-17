from .step import Step

class EquationStep(Step):
    def __init__(self, symbol, description, expr, value, unit):
        super().__init__()
        self._symbol = symbol
        self._description = description
        self._expression = expr
        self._value = value
        self._unit = unit

    @property
    def symbol(self):
        return self._symbol

    @property
    def description(self):
        return self._description

    @property
    def expression(self):
        return self._expression
    
    @property
    def value(self):
        return self._value

    @property
    def unit(self):
        return self._unit

    def __json__(self):
        return {
            'symbol': self.symbol,
            'expression': self.expression,
            'value': self.value,
            'description': self.description
        }

    for_json = __json__
