const [posts,setPosts] = useState([
	{id:1, title: 'Прогулка на самокатах', body: '18+'},
	{id:2, title: 'Резня', body: '*смайлик ножа*'},
	{id:3, title: 'Аватар: сюжет вода', body: 'Но мне понравилось'},
])

{posts.map((post) =>
    <PostItem post={post} key={post.id} />
)}