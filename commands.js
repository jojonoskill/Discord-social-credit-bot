const commands = [
  {
    name: 'showcredit',
    description: 'shows Social credit of a person',
    options : [
        {
        name: 'player',
        description: 'name of the ds member',
        type: 3,
        required : true,
      }
    ]
  }
];

module.exports = commands;
