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
        title: 'City shortcode',
        description: 'Enter a 3 letter city code (i.e. MIA) or a single "V" for virtual event'
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
            { tilte: "manu-moon-2", value: "#D1C477" },
            { tilte: "manu-earth-2", value: "#92C589" },
            { tilte: "manu-blood-2", value: "#E99198" },
            { title: "rho-cancer-2", value: "#71ACD3" },
            { title: "rho-ophiuchus-2", value: "#F3C691" },
            { title: "rho-capricorn-2", value: "#F6E091" },
            { title: "rho-aquarius-2", value: "#AA83AC" },
            { title: "rho-libra-2", value: "#E4BAB4" }
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
