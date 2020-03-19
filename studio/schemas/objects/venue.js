export default {
    name: 'venue',
    type: 'object',
    title: 'Venue',
    fields: [
      {
        name: 'name',
        type: 'string',
        title: 'Name of venue'
      },
      {
        name: 'city',
        type: 'string',
        title: 'City'
      },
      {
        name: 'shortcode',
        type: 'string',
        title: 'City shortcode'
      },
      {
        title: "Color",
        description: "Pick a color for the city block",
        name: "color",
        type: "colors", // required
        options: {
          borderradius: {
            outer: "100%",
            inner: "100%"
          },
          list: [
            { title: "Yellow", value: "rgba(245, 199, 1, 1)" },
            { title: "Pink", value: {r: 246, g: 206, b: 219} },
            { title: "Red", value: "#f16d70" },
            { title: "Teal", value: "#88c6db" },
            { title: "Purple", value: "#aca0cc" },
            { title: "Green", value: "#bdcdcb" },
            { title: "White", value: "white" }
          ]
        }
      },
      {
        name: 'postCode',
        type: 'string',
        title: 'Post code'
      },
      {
        name: 'country',
        type: 'string',
        title: 'Country'
      }
    ]
  }
