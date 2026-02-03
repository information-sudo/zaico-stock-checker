const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// ミドルウェア設定
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Zaico API プロキシエンドポイント
app.post('/api/zaico/search', async (req, res) => {
    try {
        const { apiToken, itemCode } = req.body;

        if (!apiToken || !itemCode) {
            return res.status(400).json({ error: 'APIトークンと品番が必要です' });
        }

        console.log(`品番 ${itemCode} を検索中...`);

        // まず品番(code)で検索
        let url = `https://web.zaico.co.jp/api/v1/inventories?code=${encodeURIComponent(itemCode)}&per_page=100`;
        
        let response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': apiToken,
                'Content-Type': 'application/json'
            }
        });

        let data = await response.json();
        console.log(`品番検索結果:`, data);

        // 品番で見つからない場合、タイトルで検索
        if (!data.inventories || data.inventories.length === 0) {
            console.log(`品番で見つからず、タイトルで再検索: ${itemCode}`);
            url = `https://web.zaico.co.jp/api/v1/inventories?title=${encodeURIComponent(itemCode)}&per_page=100`;
            
            response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Authorization': apiToken,
                    'Content-Type': 'application/json'
                }
            });

            data = await response.json();
            console.log(`タイトル検索結果:`, data);
        }

        // 完全一致を探す
        const exactMatch = data.inventories?.find(inv => 
            inv.code === itemCode || 
            inv.item_code === itemCode ||
            inv.title === itemCode ||
            inv.title?.includes(itemCode)
        );

        if (exactMatch) {
            return res.json({
                found: true,
                name: exactMatch.title,
                stock: exactMatch.quantity || 0,
                unit: exactMatch.unit || '個',
                updatedAt: exactMatch.updated_at
            });
        }

        return res.json({ found: false });

    } catch (error) {
        console.error('Zaico API Error:', error);
        res.status(500).json({ 
            error: 'Zaico API接続エラー',
            details: error.message 
        });
    }
});

// ヘルスチェック
app.get('/health', (req, res) => {
    res.json({ status: 'ok', message: 'Zaico在庫確認サーバー稼働中' });
});

// ルートアクセス
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`🚀 サーバー起動: http://localhost:${PORT}`);
});
