from sympy import *

init_session(quiet=True)
from sympy.interactive import printing
printing.init_printing(use_latex=True)
A, Z = symbols("A Z")
with evaluate(False):
    a=sqrt(4*A**2*Z**2)
    test = latex(a)
    print (test)
