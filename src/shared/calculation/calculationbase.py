from ..report import section, sheet
from sympy import latex

class CalculationBase(object):
    def __init__(self):
        pass

    def new_sheet(self, name):
        self.report = sheet.Sheet(name)

    def new_section(self, name):
        self.section = self.report.new_section(name)

    def new_text(self, text):
        self.section.new_text_step(text)

    def add_declaration(self, symbol, description, value, unit):
        self.section.new_equation_step(latex(symbol), description, latex(symbol), value, unit)

    def add_equation(self, symbol, description, expression, subs, unit):
        self.section.new_equation_step(latex(symbol), description, latex(expression), expression.subs(subs), unit)