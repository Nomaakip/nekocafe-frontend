const express = require('express');
const router = express.Router();

const colors = [
    [193, 160, 255],
    [255, 160, 247],
    [255, 160, 160],
    [194, 255, 153],
    [153, 201, 255]
];

router.get('/', async (req, res) => {
    try {
        const postsReq = await fetch('https://cafe.frizzbees.dev/feeds/recent/1');
        const postsRes = await postsReq.json();

        const pagesReq = await fetch('https://cafe.frizzbees.dev/pages/get_recent');
        const pagesRes = await pagesReq.json();

        console.log(pagesRes);

        return res.render('index', { postsRes, pagesRes, colors });
    } catch (err) {
        return res.send('Error');
    }
});


router.get('/page/:page', async (req, res) => {
    const { page } = req.params;

    if (!page || Number.isNaN(Number(page))) {
        return res.send('Invalid page');
    }

    try {
        const postsReq = await fetch(`https://cafe.frizzbees.dev/feeds/recent/${page}`);
        const postsRes = await postsReq.json();

        const pagesReq = await fetch('https://cafe.frizzbees.dev/pages/get_recent');
        const pagesRes = await pagesReq.json();

        console.log(pagesRes);

        return res.render('index', { postsRes, pagesRes, colors });
    } catch (err) {
        return res.send('Error');
    }
});

router.get('/profile/:username', async (req, res) => {
    const { username } = req.params;

    try {
        const profileReq = await fetch(`https://cafe.frizzbees.dev/get_profile?name=${username}`);
        const profileRes = await profileReq.json();

        const postsReq = await fetch(`https://cafe.frizzbees.dev/get_posts/1?name=${username}`);
        const postsRes = await postsReq.json();

        return res.render('profile', { profileRes, postsRes, colors });
    } catch (err) {
        return res.send('Error');
    }
});

router.get('/post/:id', async (req, res) => {
    const { id } = req.params;
    
    try {

        const postReq = await fetch(`https://cafe.frizzbees.dev/get_post/${id}`);
        const postRes = await postReq.json();

        console.log(postRes)

        const profileReq = await fetch(`https://cafe.frizzbees.dev/get_profile?name=${postRes.name}`);
        const profileRes = await profileReq.json();

        const commentsReq = await fetch(`https://cafe.frizzbees.dev/get_comments/1?post_id=${id}`);
        const commentsRes = await commentsReq.json();

        return res.render('post', { postRes, profileRes, commentsRes, colors });
    } catch (err) {
        console.log(err)
        return res.send('Error');
    }
});

module.exports = router;