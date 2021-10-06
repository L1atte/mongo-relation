/*
 * @Author: Latte
 * @Date: 2021-09-29 23:21:28
 * @LAstEditors: Latte
 * @LastEditTime: 2021-10-06 15:07:53
 * @FilePath: \mongo-relation\db.js
 */
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/mongo-relation");

const Category = mongoose.model(
	"Category",
	new mongoose.Schema({
		name: { type: String },
	})
);

const Post = mongoose.model(
	"Post",
	new mongoose.Schema({
		title: { type: String },
		body: { type: String },
		category: { type: mongoose.SchemaTypes.ObjectId, ref: "Category" },
		categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Category" }],
	})
);

async function main() {
	// await Post.insertMany([
	//   { title: '我的第一篇帖子', body: '内容1'},
	//   { title: '我的第二篇帖子', body: '内容2'},
	// ])
	// await Category.insertMany([
  //   { name: "nodejs" }, 
  //   { name: "Vuejs" }
  // ]);
  const post1 = await Post.findOne({ title: '我的第一篇帖子' })
  const post2 = await Post.findOne({ title: '我的第二篇帖子' })
  const cat1 = await Category.findOne({ name: 'nodejs' })
  const cat2 = await Category.findOne({ name: 'Vuejs' })
  post1.category = cat1._id
  post1.categories = [cat1._id,cat2._id]
  post2.category = cat2._id
  post2.categories = [cat2._id]
  await post1.save()
  await post2.save()

  const posts = await Post.find().populate('categories')
  console.log(posts);
}
main();
