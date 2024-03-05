const defaultOptions = {
  logic: {
    fields: [
      {
        id: 'password',
        type: 'password',
        label: 'Please Type Your Password',
        placeholder: 'Type ...',
        validation: {
          required: { msg: 'Password is required' },
          min: {
            value: 5,
            type: 'length',
            msg: 'Password Shoul Be More then 5 characters'
          }
        }
      },
      {
        id: 'name',
        type: 'name',
        label: 'Please Type Your name',
        placeholders: {
          first: 'First Name',
          last: 'Last Name'
        }
      }
    ],
    logic: [
      {
        id: 'password',
        action: 'show',
        operator: 'and',
        conditions: [
          {
            id: 'name',
            value: 'John',
            rule: 'is',
            item: 'first'
          },
          {
            id: 'name',
            value: 'Doe',
            rule: 'is',
            item: 'last'
          }
        ]
      }
    ]
  },
  pagination: {
    pagination: {
      buttons: { type: 0, next: 'Next', prev: 'Prev' },
      initial: 0,
      mode: 'page',
      pages: [
        {
          title: 'Page 1',
          description: '',
          fields: [1, 2, 3]
        },
        {
          title: 'Page 2',
          description: '',
          fields: [4, 5, 6]
        }
      ],
      timeline: 1
    },
    fields: [
      {
        type: 'text',
        id: 1,
        placeholder: 'text',
        label: 'What do you like about the product / service?'
      },
      {
        type: 'text',
        id: 2,
        placeholder: 'text',
        label: 'What do you like about the product / service?'
      },
      {
        type: 'text',
        id: 3,
        placeholder: 'text',
        label: 'What do you like about the product / service?'
      },
      {
        type: 'text',
        id: 4,
        height: '120px',
        placeholder: 'text',
        label: 'What do you like about the product / service? '
      },
      {
        type: 'textarea',
        id: 5,
        height: '120px',
        placeholder: '',
        label: 'What do you like about the product / service?',
        width: 'px'
      },
      {
        type: 'text',
        id: 6,
        label: 'Type your interesting achviments here'
      }
    ],
    button: {
      text: 'submit'
    }
  },
  grid: {
    fields: [
      {
        type: 'text',
        id: 1,
        placeholder: 'Single Line',
        label: 'Single Line Field'
      },
      {
        type: 'text',
        id: 2,
        placeholder: 'Single Line',
        label: 'Single Line Field'
      },
      {
        type: 'textarea',
        id: 3,
        placeholder: 'Enter your long text',
        label: 'Multi line field'
      },
      {
        type: 'textarea',
        id: 4,
        placeholder: 'Your Comments',
        label: 'Left a comment'
      }
    ],
    gridOptions: {
      cols: 4,
      width: 800,
      rowHeight: 1,
      margin: [0, 0],
      isBounded: false,
      isDraggable: false,
      isResizable: false,
      containerPadding: [0, 0],
      layout: {
        1: {
          h: 119,
          maxH: 119,
          maxW: 4,
          minH: 119,
          minW: 1,
          w: 2,
          x: 0,
          y: 0
        },
        2: {
          h: 119,
          maxH: 119,
          maxW: 4,
          minH: 119,
          minW: 1,
          w: 2,
          x: 2,
          y: 0
        },
        3: {
          h: 110,
          maxH: 110,
          maxW: 4,
          minH: 110,
          minW: 2,
          w: 4,
          x: 0,
          y: 238
        },
        4: {
          h: 119,
          maxH: 119,
          maxW: 4,
          minH: 119,
          minW: 1,
          w: 3,
          x: 0,
          y: 0
        }
      }
    }
  },
  gridAndLogic: {
    fields: [
      {
        type: 'text',
        id: 1,
        placeholder: 'Single Line',
        label: 'Do you like apple?'
      },
      {
        type: 'text',
        id: 2,
        placeholder: 'Single Line',
        label: 'Single Line Field'
      },
      {
        type: 'textarea',
        id: 3,
        placeholder: 'Enter your long text',
        label: 'Multi line field'
      },
      {
        type: 'textarea',
        id: 4,
        placeholder: 'Your Comments',
        label: 'Left a comment'
      }
    ],
    logic: [
      {
        id: 3,
        action: 'show',
        conditions: [
          {
            id: 1,
            rule: 'is',
            value: 'yes'
          }
        ]
      }
    ],
    gridOptions: {
      cols: 4,
      width: 800,
      rowHeight: 1,
      margin: [0, 0],
      isBounded: false,
      isDraggable: false,
      isResizable: false,
      containerPadding: [0, 0],
      layout: {
        1: {
          h: 119,
          maxH: 119,
          maxW: 4,
          minH: 119,
          minW: 1,
          w: 2,
          x: 0,
          y: 0
        },
        2: {
          h: 119,
          maxH: 119,
          maxW: 4,
          minH: 119,
          minW: 1,
          w: 2,
          x: 2,
          y: 0
        },
        3: {
          h: 110,
          maxH: 110,
          maxW: 4,
          minH: 110,
          minW: 2,
          w: 4,
          x: 0,
          y: 238
        },
        4: {
          h: 119,
          maxH: 119,
          maxW: 4,
          minH: 119,
          minW: 1,
          w: 3,
          x: 0,
          y: 0
        }
      }
    }
  },
  gridAndPagination: {
    fields: [
      {
        type: 'text',
        id: 1,
        placeholder: 'Single Line',
        label: 'Do you like apple?'
      },
      {
        type: 'text',
        id: 2,
        placeholder: 'Single Line',
        label: 'Single Line Field'
      },
      {
        type: 'textarea',
        id: 3,
        placeholder: 'Enter your long text',
        label: 'Multi line field'
      },
      {
        type: 'textarea',
        id: 4,
        placeholder: 'Your Comments',
        label: 'Left a comment'
      }
    ],

    gridOptions: {
      cols: 4,
      width: 800,
      rowHeight: 1,
      margin: [0, 0],
      isBounded: false,
      isDraggable: false,
      isResizable: false,
      containerPadding: [0, 0],
      layout: {
        1: {
          h: 119,
          maxH: 119,
          maxW: 4,
          minH: 119,
          minW: 1,
          w: 2,
          x: 0,
          y: 0
        },
        2: {
          h: 119,
          maxH: 119,
          maxW: 4,
          minH: 119,
          minW: 1,
          w: 2,
          x: 2,
          y: 0
        },
        3: {
          h: 110,
          maxH: 110,
          maxW: 4,
          minH: 110,
          minW: 2,
          w: 4,
          x: 0,
          y: 238
        },
        4: {
          h: 119,
          maxH: 119,
          maxW: 4,
          minH: 119,
          minW: 1,
          w: 3,
          x: 0,
          y: 0
        }
      }
    },
    pagination: {
      buttons: { type: 0, next: 'Next', prev: 'Prev' },
      initial: 0,
      mode: 'page',
      pages: [
        {
          title: 'Page 1',
          description: '',
          fields: [1, 2]
        },
        {
          title: 'Page 2',
          description: '',
          fields: [3, 4]
        }
      ]
    }
  },
  paginationAndLogic: {
    fields: [
      {
        id: 1,
        type: 'text',
        label: 'Single line1',
        required: true
      },
      {
        id: 2,
        type: 'text',
        label: 'Single line2'
      },
      {
        id: 3,
        type: 'text',
        label: 'Multi Line3'
      },

      {
        id: 4,
        type: 'text',
        label: 'Multi Line4',
        required: true
      },
      {
        id: 5,
        type: 'text',
        label: 'Multi Line5',
        required: true
      },
      {
        id: 6,
        type: 'text',
        label: 'Single line6',
        required: true
      },
      {
        id: 7,
        type: 'date',
        label: 'Single line7',
        required: true
      },
      {
        id: 9,
        type: 'text',
        label: 'Single line9',
        required: true
      },
      {
        id: 10,
        type: 'text',
        label: 'Single line10'
      }
    ],
    pagination: {
      timeline: 0,
      buttons: { type: 0 },
      mode: 'page',
      pageCounter: true,
      pages: [
        {
          title: 'Page 1',
          fields: [1, 2, 3, 7]
        },
        {
          title: 'Page 2',
          fields: [4, 5, 6]
        },
        {
          title: 'Page 3',
          fields: [8, 9]
        },
        {
          title: 'Page 4',
          fields: [10]
        }
      ]
    },
    logic: [
      {
        id: 4,
        action: 'show',
        conditions: [{ id: 10, rule: 'is', value: 'aaa' }]
      },
      {
        id: 5,
        action: 'show',
        conditions: [{ id: 10, rule: 'is', value: 'aaa' }]
      },
      {
        id: 6,
        action: 'show',
        conditions: [{ id: 10, rule: 'is', value: 'aaa' }]
      },
      {
        id: 1,
        action: 'show',
        conditions: [
          {
            id: 2,
            rule: 'is',
            value: 'aaa'
          }
        ]
      },
      {
        id: 3,
        action: 'hide_page',
        conditions: [{ id: 1, rule: 'is', value: 'Pashik' }]
      }
    ]
  },
  gridPaginationLogic: {
    fields: [
      {
        id: 1,
        type: 'text',
        label: 'Single line1',
        required: true
      },
      {
        id: 2,
        type: 'text',
        label: 'Single line2'
      },
      {
        id: 3,
        type: 'text',
        label: 'Multi Line3'
      },

      {
        id: 4,
        type: 'text',
        label: 'Multi Line4',
        required: true
      },
      {
        id: 5,
        type: 'text',
        label: 'Multi Line5',
        required: true
      },
      {
        id: 6,
        type: 'text',
        label: 'Single line6',
        required: true
      },
      {
        id: 7,
        type: 'date',
        label: 'Single line7',
        required: true
      },
      {
        id: 9,
        type: 'text',
        label: 'Single line9',
        required: true
      },
      {
        id: 10,
        type: 'text',
        label: 'Single line10'
      }
    ],
    pagination: {
      timeline: 0,
      buttons: { type: 0 },
      mode: 'page',
      pageCounter: true,
      pages: [
        {
          title: 'Page 1',
          fields: [1, 2, 3, 7]
        },
        {
          title: 'Page 2',
          fields: [4, 5, 6]
        },
        {
          title: 'Page 3',
          fields: [8, 9]
        },
        {
          title: 'Page 4',
          fields: [10]
        }
      ]
    },
    logic: [
      {
        id: 4,
        action: 'show',
        conditions: [{ id: 10, rule: 'is', value: 'aaa' }]
      },
      {
        id: 5,
        action: 'show',
        conditions: [{ id: 10, rule: 'is', value: 'aaa' }]
      },
      {
        id: 6,
        action: 'show',
        conditions: [{ id: 10, rule: 'is', value: 'aaa' }]
      },
      {
        id: 1,
        action: 'show',
        conditions: [
          {
            id: 2,
            rule: 'is',
            value: 'aaa'
          }
        ]
      },
      {
        id: 3,
        action: 'hide_page',
        conditions: [{ id: 1, rule: 'is', value: 'Pashik' }]
      }
    ]
  }
}

export default defaultOptions
