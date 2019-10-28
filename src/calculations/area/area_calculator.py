from ... import app
from src.shared.report import section, sheet
from src.shared.calculation import calculationbase
from flask import jsonify, render_template, request

from sympy import symbols, latex

template = "calculations/area.html"
header = "Test"
description = ""
calculation_route = "/area/"

class AreaCalculationInputs(object):
    def __init__(self, length, breadth):
        self.breadth = breadth
        self.length = length

class AreaCalculator(calculationbase.CalculationBase):
    def __init__(self, inputs):
        self.inputs = inputs
    
    def calculate(self):
        inputs = self.inputs
        self.new_sheet('Area calculation')
        self.l, self.b, self.A = symbols("l b A")
        self.area_of_rectangle = self.l * self.b

        self.new_section('Input Data')
        self.add_declaration(self.l, "Length", inputs.length, "m")
        self.add_declaration(self.b, "Breadth", inputs.breadth, "m")
        self.add_equation(self.A, "Area", self.area_of_rectangle, [(self.l, inputs.length), (self.b, inputs.breadth)], "m²")

@app.route(calculation_route)
def layout():
    return render(AreaCalculationInputs(10, 20), None)

@app.route(calculation_route, methods=['POST'])
def calculate():
    inputs = get_inputs(request.form)
    calculator = AreaCalculator(inputs)
    calculator.calculate()
    return render(inputs, calculator.report)

def render(inputs, report):
    return render_template(template, header=header, description=description, report=report,calculation_route=calculation_route, inputs=inputs)

def get_inputs(form):
    return AreaCalculationInputs(form['length'], form['breadth'])