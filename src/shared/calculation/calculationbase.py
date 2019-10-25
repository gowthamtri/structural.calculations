from ..report import section, sheet, table_step
from sympy import latex

class CalculationBase(object):
    def __init__(self):
        pass

    def new_sheet(self, name):
        self.report = sheet.Sheet(name)
    
    def new_section_group(self, name):
        self.section_group = self.report.new_section_group(name)

    def close_section_group(self):
        self.section_group = None

    def new_section(self, name):
        if hasattr(self, 'section_group') and self.section_group != None:
            self.section = self.section_group.new_section(name)
        else:
            self.section = self.report.new_section(name)

    def new_text(self, text):
        self.section.new_text_step(text)

    def add_declaration(self, symbol, description, value, unit):
        self.section.new_equation_step(latex(symbol), description, latex(symbol), value, unit)

    def add_equation(self, symbol, description, expression, subs, unit):
        self.section.new_equation_step(latex(symbol), description, latex(expression), expression.subs(subs), unit)
    
    def new_table(self):
        self.table = self.section.new_table()
    
    def add_header(self, *argv):
        self.table.add_header(*argv)
    
    def add_row(self, *argv):
        self.table.add_row(*argv)