from ... import app
from src.shared.report import section, sheet
from flask import jsonify, render_template, request

from sympy import symbols, latex

template = "calculations/creep_coefficient.html"
header = "Creep coefficient"
description = "Calculate creep coefficient"
calculation_route = "/creepcoeff/"
script_file = "creep_coeff.js"

class CreepCoefficientInputs(object):
    def __init__(self):
        self.elementtype = 0
        self.width = 100
        self.depth = 100
        self.rh = 0.5
        self.fck = 10
        self.t = 10
        self.t0 = 10
        self.temperature = 35
        self.elementtype = 0
        self.element_types = [
            { "value": 0, "description": "Beam"},
            { "value": 1, "description": "Slab internal"},
            { "value": 2, "description": "Slab edge"}
        ]
    
    def create_inputs(self, form):
        self.elementtype = int(form["elementtype"])
        self.width = form["width"]
        self.depth = form["depth"]
        self.rh = form["rh"]
        self.fck = form["fck"]
        self.t = form["t"]
        self.t0 = form["t0"]
        self.temperature = form["temperature"]

class CreepCoefficientCalculator(object):
    def __init__(self, inputs):
        self.inputs = inputs

    def calculate(self):
        inputs = self.inputs
        self.report = sheet.Sheet('Creep coefficient calculation')
        section = self.report.new_section('Input Data')
        section.new_text_step("Dummy text")

@app.route(calculation_route)
def creep_coefficient_layout():
    return render(CreepCoefficientInputs(), None)

@app.route(calculation_route, methods=['POST'])
def creep_coefficient_calculate():
    inputs = get_inputs(request.form)
    calculator = CreepCoefficientCalculator(inputs)
    calculator.calculate()
    return render(inputs, calculator.report)

def render(inputs, report):
    return render_template(template, header=header, description=description, report=report, calculation_route=calculation_route, inputs=inputs)

def get_inputs(form) -> CreepCoefficientInputs:
    default_inputs = CreepCoefficientInputs()
    default_inputs.create_inputs(form)
    return default_inputs