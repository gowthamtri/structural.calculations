from ... import app
from src.shared.report import section, sheet
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

class AreaCalculator(object):
    def __init__(self, inputs):
        self.inputs = inputs
    
    def calculate(self):
        inputs = self.inputs
        self.report = sheet.Sheet('Area calculation')
        l, b, A = symbols("l b A")
        expr = eval("l * b")

        section = self.report.new_section('Input Data')
        section.new_equation_step(l, "Length", latex(l), inputs.length, "m")
        section.new_equation_step(b, "Breadth", latex(b), inputs.breadth, "m")
        section.new_equation_step(A, "Area", latex(expr), expr.subs([(l, inputs.length), (b, inputs.breadth)]), "m²")

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