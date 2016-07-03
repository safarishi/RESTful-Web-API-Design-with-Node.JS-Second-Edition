var fs = require('fs');
var js2xmlparser = require("js2xmlparser");

function read_json_file()
{
  var file = './data/contacts.json';
  return fs.readFileSync(file);
}

exports.list = function()
{
  console.log('list');
  return JSON.parse(read_json_file());
};

exports.listXml = () => {
  var resObj = this.list();

  return js2xmlparser('rs', resObj);
}

exports.query = (number) => {
  var json = read_json_file();
  var json_result = JSON.parse(json);
  var result = json_result.result;

  for (var i = 0; i < result.length; i++)
  {
    var contact = result[i];
    if (contact.primarycontactnumber === number)
    {
      return contact;
    }
  }
  return null;
};

exports.queryXml = (number) => {
  var obj = this.query(number);
  if (obj === null) {
    return js2xmlparser('rs', 'null');
  }

  return js2xmlparser('rs', obj);
}

exports.query_by_arg = (arg, value) => {
  var json = read_json_file();
  var json_result = JSON.parse(json);
  var result = json_result.result;

  for (var i = 0; i < result.length; i++)
  {
    var contact = result[i];
    if (contact[arg] === value)
    {
      return contact;
    }
  }
  return null;
};

exports.queryByArgXml = (arg, value) => {
  var obj = this.query_by_arg(arg, value);

  if (obj === null) {
    return js2xmlparser('rs', 'null');
  }

  return js2xmlparser('rs', obj);
}

exports.list_groups = () => {
  var json = read_json_file();
  var json_result = JSON.parse(json);
  var result = json_result.result;

  var resultArray = [];

  for (var i = 0; i < result.length; i++)
  {
    var groups = result[i].groups;
    for (var index = 0; index < groups.length; index++)
    {
      if (resultArray.indexOf(groups[index]) ===-1)
      {
        resultArray.push(groups[index]);
      }
    }
  }

  return resultArray;
};

exports.listGroupXml = () => {
  var obj = this.list_groups();

  return js2xmlparser('groups', {group: obj});
}

exports.get_members = (group_name) => {
  var json = read_json_file();
  var json_result = JSON.parse(json);
  var result = json_result.result;

  var resultArray = [];

  for (var i = 0; i < result.length; i++)
  {

    if (result[i].groups.indexOf(group_name) > -1)
    {
      resultArray.push(result[i]);
    }
  }

  return resultArray;
};

exports.getXmlMember = (groupName) => {
  var arr = this.get_members(groupName);

  return js2xmlparser('rs', { member: arr });
}
