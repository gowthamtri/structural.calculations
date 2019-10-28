from ... import app
import json
from src.shared.report import section, sheet
from src.shared.calculation import calculationbase
from flask import jsonify, render_template, request

from sympy import symbols, latex

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
    
    def create_inputs(self, form):
        self.elementtype = int(form["elementtype"])
        self.width = form["width"]
        self.depth = form["depth"]
        self.rh = form["rh"]
        self.fck = form["fck"]
        self.t = form["t"]
        self.t0 = form["t0"]
        self.temperature = form["temperature"]

    def __json__(self):
        return {
            'elementtype': self.elementtype,
            'width': self.width,
            'depth': self.depth,
            'rh': self.rh,
            'fck': self.fck,
            't': self.t,
            't0': self.t0,
            'temperature': self.temperature,
            'element_types': [
                { "value": 0, "description": "Beam"},
                { "value": 1, "description": "Slab internal"},
                { "value": 2, "description": "Slab edge"}
            ]
        }

    for_json = __json__

class CreepCoefficientCalculator(calculationbase.CalculationBase):
    def __init__(self, inputs):
        self.inputs = inputs

    def calculate(self):
        inputs = self.inputs
        inputs = self.inputs
        self.new_sheet('Creep coefficient calculation')
        self.width, self.depth, self.rh, self.fck, self.t, self.t0, self.temperature \
            = symbols("l d R_h F_ck t t_0 temp")

        self.new_section("Input Data")
        self.add_declaration(self.width, "Width", inputs.width, "m")
        self.add_declaration(self.depth, "Depth", inputs.depth, "m")
        self.add_declaration(self.rh, "Rh", inputs.rh, "")
        self.add_declaration(self.fck, "Fck", inputs.fck, "")
        self.add_declaration(self.t, "T", inputs.t, "")
        self.add_declaration(self.t0, "T0", inputs.t0, "")
        self.add_declaration(self.temperature, "Temperature", inputs.temperature, "")

        self.new_section("Calcualtions")
        self.phi_rh = symbols("phi_rh")
        self.phi_rh_expr = 1 + (1 - 0.01 * self.rh) / (0.1 * (self.t0 ** (1 / 3)))
        self.add_equation(self.phi_rh, "Factor to allow the effect of relative humidity on the notional creep coefficient [Eq. B.3a] ", \
            self.phi_rh_expr, [(self.rh, 10), (self.t0, 20)], "m")

        self.new_table()
        self.add_header('Description', 'Value')
        self.add_row("Width", inputs.width)
        self.add_row("Depth", inputs.depth)
        self.add_row("Rh", inputs.rh)

template = "calculation_base_react.html"
header = "Creep coefficient"
description = "Calculate creep coefficient"
calculation_route = "/creepcoeff/"
script_file = "creep_coeff.js"

@app.route(calculation_route)
def creep_coefficient_layout():
    return render(json.dumps(CreepCoefficientInputs().__json__()), None)

@app.route(calculation_route, methods=['POST'])
def creep_coefficient_calculate():
    inputs = get_inputs(request.json)
    calculator = CreepCoefficientCalculator(inputs)
    calculator.calculate()
    return jsonify(json.dumps(calculator.report.__json__()))
    # return render(json.dumps(inputs.__json__()), calculator.report)

def render(inputs, report):
    return render_template(template, header=header, description=description, report=report, calculation_route=calculation_route, inputs=inputs)

def get_inputs(form) -> CreepCoefficientInputs:
    default_inputs = CreepCoefficientInputs()
    default_inputs.create_inputs(form)
    return default_inputs