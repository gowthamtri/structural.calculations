from src.shared.report.step import Step

class TableCell(object):
    """Class to define a cell in table.
    Currently supported custom styles: latex
    """
    def __init__(self, content, col_span = 1, row_span = 1, style = ''):
        self.content = content
        self.col_span = col_span
        self.row_span = row_span
        self.style = style
    
    def __json__(self):
        return {
            'content': self.content,
            'col_span': self.col_span,
            'row_span': self.row_span,
            'style': self.style
        }

    for_json = __json__

class TableRow(object):
    def __init__(self, cells):
        self.cells = cells
    
    def __json__(self):
        return {
            'cells': [ x.__json__() for x in self.cells]
        }

    for_json = __json__

class TableStep(Step):
    def __init__(self):
        self.rows = []
        self.headers = []
    
    def add_row(self, *argv):
        self.rows.append(TableRow(self.get_cells(*argv)))

    def add_header(self, *argv):
        self.headers.append(TableRow(self.get_cells(*argv)))
    
    def get_cells(self, *argv):
        cells = []
        for arg in argv:
            if isinstance(arg, str):
                cells.append(TableCell(arg))
            elif isinstance(arg, int) or isinstance(arg, float) or isinstance(arg, bool):
                cells.append(TableCell(str(arg)))
            else:
                if 'colspan' in arg:
                    cells[len(cells) - 1].col_span = arg['colspan']
                if 'rowspan' in arg:
                    cells[len(cells) - 1].row_span = arg['rowspan']
                if 'style' in arg:
                    cells[len(cells) - 1].style = arg['style']
        return cells
    
    def __json__(self):
        return {
            'headers': [ x.__json__() for x in self.headers],
            'rows': [ x.__json__() for x in self.rows]
        }

    for_json = __json__
