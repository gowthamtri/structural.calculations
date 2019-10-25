from .section import Section

class SectionGroup(object):
    def __init__(self, header):
        self._header = header
        self._sections = []
    
    @property
    def header(self):
        return self._header

    @property
    def sections(self):
        return self._sections
    
    def new_section(self, header):
        section = Section(header)
        self._sections.append(section)
        return section

    def __json__(self):
        return {
            'header': self.header,
            'sections': [ x.__json__() for x in self.sections]
        }

    for_json = __json__