# Development_Blueprint_v3.md 

## 1. 项目概览 & 资产定义 
本项旨在构建一个全品类的金融资产交易平台。 
**核心基座** : Next.js 15 (App Router) + TypeScript + Tailwind CSS。 
**现有资产复用** : 页面必须深度集成项目根目录下 `/jyui`  文件夹中的 UI 组件和 CSS 动画效果。 

**资产类别** : 
*   **Crypto (Spot/Swap)** : 加密货币现货与永续合约。 
*   **Forex** : 外汇（如 EUR/USD, USD/JPY）。 
*   **US_Stocks** : 美股实时行情（如 AAPL, TSLA, NVDA）。 
*   **Binary_Options (期权)** : 分钟级涨跌博弈（后期重点开发逻辑，前期仅展示 UI）。 

## 2. 视觉与交互规范 (依托 jyui) 
*   **主题色** : 延续 `jyui`  的深色模式设计，背景 `#000000` ，上涨 `#02C076` ，下跌 `#F84960` 。 
*   **动态效果** : 价格跳动必须调用 `jyui`  中的“呼吸灯”效果。 
*   **翻译准则** : 严禁使用自动翻译。LTC=莱特币, DOT=波卡, FIL=Filecoin, VET=唯链, AAPL=苹果, EUR/USD=欧元/美元。 

## 3. 会员权限拦截架构 (Security & Business) 
*   **拦截目标** : `/trade`  下的所有子路由页面。 
*   **逻辑实现** : 
    *   **状态获取**：从 `useUserStore`  获取 `isVip`  状态。 
    *   **UI 遮罩** : 如果用户非 VIP，必须在交易操作区（下单按钮、深度图、期权买涨买跌区）上方覆盖一个带有 `backdrop-blur`  的 `VipUpgradeOverlay`  组件。 
    *   **引导文案** : “此资产交易仅限 VIP 会员，请点击升级以获取实时深度与下单权限”。 

## 4. 全品类行情适配层 (Data Layer) 
Trae 需要在 `store/marketStore.ts`  中实现统一的数据格式，聚合多源 API： 
*   **加密货币接口** : 模拟或对接主流交易所 WebSocket（现货与合约）。 
*   **外汇/美股接口** : 预留第三方行情供应商（如 Polygon.io）的数据接入点。 
*   **统一模型** : 
    ```typescript
    interface AssetData { 
      id: string; // 如 "BTC_USDT_SPOT" 
      type: 'SPOT' | 'SWAP' | 'FOREX' | 'STOCK' | 'OPTION'; 
      symbol: string; // 币种/资产代码 
      displayName: string; // 中文全称 
      price: number; 
      changeRate: number; // 涨跌幅 
      hasOption: boolean; // 是否支持二元期权标签 
    } 
    ```

## 5. 页面详细指令 

### 页面 A：全品类行情大厅 (Market Hub) 
*   **功能**: 使用 Tab 切换显示不同类别的资产列表。 
*   **UI 复用**: 列表样式必须匹配 `jyui` 中的行情项布局。 
*   **实时性**: 使用 WebSocket 驱动价格刷新，确保每秒更新不卡顿。 

### 页面 B：专业交易终端 (Trading Page) 
*   **K线系统**: 集成 TradingView 图表，支持切换 1min 到 1Month 周期。 
*   **订单薄**: 对接合约/现货深度数据。如果是外汇/美股，则展示买卖点差。 
*   **期权面板 (预留)**: 
    *   包含“买涨/CALL”和“买跌/PUT”两个大尺寸交互按钮（颜色参考：青色/红色）。 
    *   时间刻度选择器：[1M, 5M, 15M, 30M]。 

## 6. Trae 任务执行流 (Task Flow) 
*   **环境准备**: 初始化 Next.js 环境，配置全局 `layout.tsx` 引入 `jyui` 的样式文件。 
*   **状态管理**: 建立 Zustand Store 存储 `userStatus` 和全品类资产的 `tickerData`。 
*   **行情页构建**: 基于 `jyui` 的列表组件，实现现货、外汇、美股的分类筛选显示。 
*   **交易页重构**: 实现 TradingView 的嵌入，并重点编写 `MembershipGuard` 权限拦截组件。 
*   **动态联调**: 注入多品类的 Mock 数据，确保各类别资产的 UI 表现一致。 

自动关联 API 模块 ：

- 在后台新增或编辑品种时，当您选择“类型” (如 Forex, Spot, Stock 等)，系统会自动填入对应的 API 模块标识（例如 module_forex , module_spot ）。
- Forex -> module_forex
- Spot (现货) -> module_spot
- Swap (合约) -> module_swap
- Stock (美股) -> module_stock
- Option (期权) -> module_option