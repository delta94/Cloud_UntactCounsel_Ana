/* private room list - SELECT * FROM Chat_list WHERE manager */
exports.doStar = async (manager, grade) => {
  let info = await Models.Chat.create({
    manager,
    grade,
  });
  return [true, info.id];
};
