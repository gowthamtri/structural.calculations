from ... import app
from src.shared.report import section, sheet
from flask import jsonify, render_template

from sympy import *
from sympy.simplify.fu import *

@app.route('/calculate/')
def calculate():
    report = sheet.Sheet('Basic calculation')
    section = report.new_section('Input Data')
    section.new_text_step('Sample text')
    x = symbols("x")
    fx = symbols("F_x")
    expr = "x**2 + 8*x + 16"
    section.new_equation_step(latex(fx),
        "Sample function", latex(eval(expr)),
        str(eval(expr).subs([(x, 2)])), "Nm")

    ixy = symbols("I_xy")
    ixyExpr = Integral(sqrt(1 / x, x))
    section.new_equation_step(latex(ixy), "Integral", latex(ixyExpr), ixyExpr.subs([(x, 10)]), "kN/m²")
    cosExpr = cos(x) + 1
    section.new_equation_step(latex(symbols("cos(x)")), "Cosine", latex(cosExpr), cosExpr.subs([(x, 0)]), "o")
    # json = report.__json__()
    return render_template(
        "calculate.html",
        report=report
    )