export default {
  data() {
    return {
      columns: [
        {
          name: 'Name',
          label: 'Nazwa',
          field: 'name',
          align: 'left',
          sortable: true,
          sort: (a, b) => {
            const lettermap = {
              Ё: 'JO',
              Й: 'J',
              Ц: 'C',
              У: 'U',
              К: 'K',
              Е: 'E',
              Н: 'N',
              Г: 'G',
              Ш: 'SZ',
              Щ: 'SZCZ',
              З: 'Z',
              Х: 'H',
              Ъ: "'",

              ё: 'jo',
              й: 'j',
              ц: 'c',
              у: 'u',
              к: 'k',
              е: 'e',
              н: 'n',
              г: 'g',
              ш: 'sz',
              щ: 'szcz',
              з: 'z',
              х: 'h',
              ъ: "'",

              Ф: 'F',
              Ы: 'Y',
              В: 'W',
              А: 'A',
              П: 'P',
              Р: 'R',
              О: 'O',
              Л: 'L',
              Д: 'D',
              Ж: 'Ż',
              Э: 'E',

              ф: 'f',
              ы: 'y',
              в: 'w',
              а: 'a',
              п: 'p',
              р: 'r',
              о: 'o',
              л: 'l',
              д: 'd',
              ж: 'ż',
              э: 'e',

              Я: 'JA',
              Ч: 'CZ',
              С: 'S',
              М: 'M',
              И: 'I',
              Т: 'T',
              Ь: "'",
              Б: 'B',
              Ю: 'JU',

              я: 'ja',
              ч: 'cz',
              с: 's',
              м: 'm',
              и: 'i',
              т: 't',
              ь: "'",
              б: 'b',
              ю: 'ju',

              Ї: 'JI',
              ї: 'ji'
            }
            const transliterate = word =>
              word
                .split('')
                .map(char => lettermap[char] || char)
                .join('')
            ;[a, b] = [a, b].map(s =>
              transliterate(s + '')
                .toLowerCase()
                .replace(/[^a-z0-9 ]/gi, '')
                .trim()
            )
            return a > b ? 1 : a === b ? 0 : -1
          }
        },
        {
          name: 'Members',
          label: 'Liczba członków',
          field: 'members',
          align: 'left',
          sortable: true
        },
        { name: 'Link', label: 'Link', field: 'link', align: 'left' },
        {
          name: 'Category',
          label: 'Kategoria',
          field: 'category',
          align: 'left'
        },
        {
          name: 'MembersGrowth',
          field: 'membersGrowth',
          label: 'Przyrost członków',
          align: 'left',
          sortable: true
        }
      ],
      pagination: {
        page: 0,
        rowsPerPage: 20,
        rowsCount: 0
      },
      lastUpdateDate: null,
      input: null,
      loading: true
    }
  },
  computed: {
    isMobileDevice() {
      return this.$q.screen.lt.sm
    }
  },
  methods: {
    filterData(rows, terms, cols, cellValue) {
      const lowerTerms = terms ? terms.toLowerCase() : ''
      return rows.filter(row =>
        cols.some(
          col =>
            (col.name === 'Name' || col.name === 'Link') &&
            (cellValue(col, row) + '').toLowerCase().indexOf(lowerTerms) !== -1
        )
      )
    }
  }
}
