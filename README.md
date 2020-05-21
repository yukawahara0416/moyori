# MoYoRi
Wifi・電源難民のための口コミ投票サービスです。  
  
https://mo-yo-ri.com/  
  
転職活動用のポートフォリオとして制作しました。  
外出中の勉強場所さがしに苦労したのが制作のきっかけです。  
既存のサービスでは満足できなかったので、自分で作りました。  
  
- 制作期間３ヶ月  
  - 平日２時間  
  - 休日６時間  
- 完全独学  
  
## アーキテクチャ
<img src="https://i.gyazo.com/0112d3fb29f7f8a777a155b39f6c0f0f.png">  
  
### コンポーネント
| 項目 | 使用技術 |
| :--- | :--- |
| クラウド | AWS（ALB・Route53・ECR・ECS/Fargate・RDS・S3） |
| コンテナ | Docker・docker-compose |
| IaC | Terraform |
| CI/CD | CircleCI |
  
### アプリケーション
| 項目 | 使用技術 |
| :--- | :--- |
| バックエンド | 言語：　Ruby <br> FW：　Rails <br> テスト：　RSpec・Rubocop |
| フロントエンド | 言語：　JavaScript <br> FW：　Vue（Vuex・VueRouter・Vuetify） <br> テスト：　Vue-unit-test・ESlint・Prettier |
| データベース | MySQL |
| 外部API | GoogleMapsJavaScriptAPI |
| 開発ツール | Git/GitHub <br> Slack <br> MacBook Pro 2017 <br> VSCode |
  
## 注目ポイント
　Docker/AWS/Terraform/CircleCIでの開発に挑戦しています。  
　Rails/VueでのBFFアプリの開発に挑戦しています。  
　外出中のスマホ利用を想定し、UI/UXにこだわりました。  
　チーム開発（GithubFlow）を意識し、PRやISSUEを活用しています。  
　rebase/mergeを使い分け、ログを汚さない開発に注意しました。  
  
## 気をつけたポイント
既存サービスのなにを不満に感じたか＝制作で注力したポイント  
- 情報の鮮度  
  - GoogleAPIを利用し、高い情報鮮度を維持できます  
- 情報の信頼度  
  - 投稿機能だけでなく、投票機能＋グラフ表示機能で直近の評判をわかりやすく提供します  
- UI/UX  
  - フロントエンドにVueを実装することで表現力を強化しています  
  
## 制作者
【現在転職活動中です！ご連絡ください^^】  
  
<img src="https://i.gyazo.com/1bade548e2ca4afc980e620306f0b2c1.png">
  
Mail：　yu.kawahara0416@gmail.com  
Twitter：　https://twitter.com/yu_kawahara0416  
Facebook：　https://www.facebook.com/yu.kawahara.92  
Wantedly：　https://www.wantedly.com/users/105529007  
Qiita：　https://qiita.com/yukawahara0416  
  
## 今後の課題
　大規模アクセス、並列処理、組み合わせ問題などに配慮できる知識と経験を習得していきたい。  
　フロントエンドをTypeScriptで書き換えたい。  
  
#### 参照WEB
　公式ドキュメント（英語でも必ず読みました）  
　Railsチュートリアル  
  
#### 参照書籍
　Webを支える技術  
　キタミ式基本情報技術者  
　Linux標準教科書  
　プロを目指す人のRuby入門  
　Ruby on Rails 5 速習実践ガイド  
　everyday Rails RSpecによるRailsテスト入門  
　Vue.js入門  
　達人に学ぶDB設計徹底指南書  
　Docker/Kubernetes実践コンテナ開発入門  
　ゼロからわかるAWS超入門  
　AWS基礎からのネットワーク＆サーバー構築  
　実践Terraform  
  
#### Udemy参照教材
　Vue JS入門決定版！jQueryを使わないWeb開発 - 導入からアプリケーション開発まで体系的に動画で学ぶ  
　現役エンジニアのためのWebpack環境構築入門 with Babel | Sass | ESlint  
　はじめてのSQL・データ分析入門 - データベースのデータをビジネスパーソンが現場で活用するためのSQL初心者コース  
　はじめてのGitとGitHub  
　もう怖くないGit！チーム開発で必要なGitを完全マスター  
　ゼロからはじめるDockerによるアプリケーション実行環境構築  
　はじめてのAmazon Web Services  
　ゼロから実践するAmazon Web Services。手を動かしながらインフラの基礎を習得  
　これだけでOK！AWS認定ソリューションアーキテクト - アソシエイト試験突破口座  
