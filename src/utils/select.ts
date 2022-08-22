export default function select(list) : object{
    const json = {};
    list.map(item => json[item] = true )
    return json;
}