from .section import Section
from .section_group import SectionGroup

class Sheet(object):
    def __init__(self, header):
        self._sections = []
        self.header = header

    @property
    def sections(self):
        return self._sections

    def new_section(self, header):
        section = Section(header)
        self._sections.append(section)
        return section
    
    def new_section_group(self, header):
        section_group = SectionGroup(header)
        self._sections.append(section_group)
        return section_group

    def __json__(self):
        return {
            'header': self.header,
            'sections': [ x.__json__() for x in self.sections]
        }

    for_json = __json__