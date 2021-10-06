- 给文章添加分类属性时，如果采用直接新增字段的方法的话，在数据同步的时候就会相对麻烦。
- 更合理的方式是采用关联模型的方式，把分类放入另一个模型内。
- 通过`category: { type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }`将category字段与Category模型关联起来
- 关联成功后，通过.populote获取关联模型的详细信息。比如通过`const posts = await Post.find().populate('category')`获取具体信息

