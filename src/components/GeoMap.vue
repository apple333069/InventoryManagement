<!-- 圖表(地理圖) -->
<template>
	<div>
		<div ref="mapChart" id="mapChart">地圖</div>
	</div>
</template>
<script setup>
import * as echarts from 'echarts';
import world from '@/assets/world.json';
// 定義 props
const props = defineProps({
	// 資料
	data: {
		type: Array,
		default: () => [],
	},
	// 選地理 json 資料: china 或 world
	mapName: {
		type: String,
		default: () => 'world',
	},
	title: {
		type: String,
		default: () => '',
	},
	// 最小數值
	min: {
		type: Number,
		default: () => 0,
	},
	// 最大數值
	max: {
		type: Number,
		default: () => 1,
	},
});

const { data, mapName, title, min, max } = props;
const mapChart = ref(null);
let barChart = null;
// 圖表初始化
const initChart = async () => {
	if (!mapChart.value) return;
	if (barChart) {
		barChart.dispose();
	}
	barChart = echarts.init(mapChart.value);
	try {
		// 預設世界地圖
		if (mapName === 'world') {
			echarts.registerMap('world', world);
		} else {
			const geoJson = await fetch(`../src/assets/${mapName}.json`).then((res) =>
				res.json()
			);
			echarts.registerMap(mapName, geoJson);
		}
		const option = {
			title: {
				text: title,
			},
			tooltip: {
				trigger: 'item',
				formatter: (params) => {
					const value = params.value;
					if (value && !isNaN(value)) {
						return `${params.name}<br/>客戶編碼: ${value}`;
					} else {
						return `${params.name}`;
					}
				},
			},
			toolbox: {
				show: true,
				orient: 'vertical',
				left: 'right',
				top: 'center',
			},
			visualMap: {
				min: min,
				max: max,
				text: ['高', '低'],
				calculable: true,
				inRange: {
					color: ['lightskyblue'],
				},
			},
			series: [
				{
					type: 'map',
					map: mapName,
					roam: true, // true 可縮放
					itemStyle: {
						areaColor: '#e7e8ea', // 地理圖底色
					},
					label: {
						show: true,
						formatter: (params) => {
							const value = params.value;
							if (value && value > 0) {
								return `${params.name}\n${value.toLocaleString()}`;
							} else {
								return ``;
							}
						},
					},
					data: data,
					nameMap: {
						Russia: '俄羅斯聯邦',
						Azerbaijan: '亞塞拜然共和國',
						Georgia: '喬治亞',
						Armenia: '亞美尼亞共和國',
						Mongolia: '蒙古',
						Kazakhstan: '哈薩克共和國',
						Kyrgyzstan: '吉爾吉斯共和國',
						'Dem. Rep. Korea': '朝鮮民主主義人民共和國',
						Korea: '大韓民國',
						Japan: '日本',
						Vietnam: '越南',
						'Lao PDR': '寮國',
						Cambodia: '柬埔寨',
						Thailand: '泰國',
						Myanmar: '緬甸聯邦共和國',
						Bhutan: '不丹王國',
						Bangladesh: '孟加拉人民共和國',
						Nepal: '尼泊爾聯邦民主共和國',
						Uzbekistan: '烏茲別克共和國',
						Tajikistan: '塔吉克共和國',
						Turkmenistan: '土庫曼共和國',
						Afghanistan: '阿富汗',
						Iran: '伊朗伊斯蘭共和國',
						Turkey: '土耳其共和國',
						'N. Cyprus': '北賽普勒斯',
						Cyprus: '賽普勒斯共和國',
						Syria: '敘利亞阿拉伯共和國',
						Iraq: '伊拉克共和國',
						Jordan: '約旦哈希米王國',
						Lebanon: '黎巴嫩共和國',
						Israel: '以色列',
						Palestine: '巴勒斯坦',
						India: '印度共和國',
						Pakistan: '巴基斯坦伊斯蘭共和國',
						'Sri Lanka': '斯里蘭卡民主社會主義共和國',
						'Saudi Arabia': '沙烏地阿拉伯王國',
						'United Arab Emirates': '阿拉伯聯合大公國',
						Qatar: '卡達',
						Kuwait: '科威特',
						Oman: '阿曼王國',
						Yemen: '葉門共和國',
						Ukraine: '烏克蘭',
						Belarus: '白俄羅斯',
						Estonia: '愛沙尼亞',
						Latvia: '拉脫維亞',
						Lithuania: '立陶宛',
						Moldova: '摩爾多瓦共和國',
						Poland: '波蘭',
						Romania: '羅馬尼亞',
						Bulgaria: '保加利亞',
						Greece: '希臘',
						Slovakia: '斯洛伐克',
						Hungary: '匈牙利',
						'Czech Rep.': '捷克共和國',
						'Czech Republic': '捷克共和國',
						Malaysia: '馬來西亞',
						Indonesia: '印度尼西亞共和國',
						Philippines: '菲律賓共和國',
						'Papua New Guinea': '巴布亞紐幾內亞獨立國',
						'Solomon Is.': '索羅門群島',
						Vanuatu: '萬那杜共和國',
						'New Caledonia': '新喀里多尼亞',
						Fiji: '斐濟共和國',
						'New Zealand': '紐西蘭',
						Australia: '澳洲',
						Finland: '芬蘭',
						Sweden: '瑞典',
						Norway: '挪威',
						Serbia: '塞爾維亞共和國',
						Macedonia: '馬其頓',
						Albania: '阿爾巴尼亞',
						Croatia: '克羅埃西亞共和國',
						Slovenia: '斯洛維尼亞共和國',
						Montenegro: '蒙特內哥羅',
						'Bosnia and Herz.': '波士尼亞與赫塞哥維納',
						Germany: '德國',
						Austria: '奧地利共和國',
						Italy: '義大利共和國',
						Denmark: '丹麥王國',
						Netherlands: '荷蘭王國',
						Belgium: '比利時王國',
						'United Kingdom': '大不列顛暨北愛爾蘭聯合王國',
						Ireland: '愛爾蘭',
						France: '法蘭西共和國',
						Spain: '西班牙王國',
						Switzerland: '瑞士',
						Portugal: '葡萄牙共和國',
						Egypt: '埃及阿拉伯共和國',
						Sudan: '蘇丹共和國',
						'S. Sudan': '南蘇丹共和國',
						Libya: '利比亞',
						Eritrea: '厄利垂亞',
						Ethiopia: '衣索比亞聯邦民主共和國',
						Somalia: '索馬利亞聯邦共和國',
						Kenya: '肯亞共和國',
						Tunisia: '突尼西亞共和國',
						Algeria: '阿爾及利亞人民民主共和國',
						Morocco: '摩洛哥王國',
						'W. Sahara': '西撒哈拉',
						Niger: '尼日共和國',
						Mali: '馬利共和國',
						Mauritania: '茅利塔尼亞伊斯蘭共和國',
						Chad: '查德共和國',
						Uganda: '烏干達共和國',
						'Dem. Rep. Congo': '剛果民主共和國',
						'Central African Rep.': '中非共和國',
						Nigeria: '奈及利亞聯邦共和國',
						'Burkina Faso': '布吉納法索',
						Togo: '多哥共和國',
						Benin: '貝南共和國',
						Ghana: '迦納共和國',
						Cameroon: '喀麥隆共和國',
						Congo: '剛果共和國',
						'Eq. Guinea': '赤道幾內亞',
						Tanzania: '坦尚尼亞聯合共和國',
						Rwanda: '盧安達共和國',
						Burundi: '蒲隆地共和國',
						Zambia: '尚比亞共和國',
						Angola: '安哥拉共和國',
						"Côte d'Ivoire": '象牙海岸共和國',
						Senegal: '塞內加爾共和國',
						Guinea: '幾內亞共和國',
						'Sierra Leone': '獅子山共和國',
						'Guinea-Bissau': '幾內亞比索',
						Liberia: '賴比瑞亞共和國',
						Gabon: '加彭共和國',
						Malawi: '馬拉威共和國',
						Mozambique: '莫三比克共和國',
						Zimbabwe: '辛巴威共和國',
						Madagascar: '馬達加斯加',
						Namibia: '納米比亞',
						Botswana: '波札那共和國',
						Lesotho: '賴索托王國',
						'South Africa': '南非共和國',
						Swaziland: '史瓦帝尼王國',
						Iceland: '冰島',
						Greenland: '格陵蘭',
						Canada: '加拿大',
						'United States': '美國',
						Mexico: '墨西哥',
						Cuba: '古巴',
						Bahamas: '巴哈馬',
						Haiti: '海地',
						'Dominican Rep.': '多明尼加共和國',
						Jamaica: '牙買加',
						'Puerto Rico': '波多黎各',
						Guatemala: '瓜地馬拉',
						Honduras: '宏都拉斯共和國',
						'El Salvador': '薩爾瓦多共和國',
						Nicaragua: '尼加拉瓜共和國',
						Belize: '貝里斯',
						'Costa Rica': '哥斯大黎加共和國',
						Panama: '巴拿馬共和國',
						Colombia: '哥倫比亞共和國',
						Venezuela: '委內瑞拉玻利瓦爾共和國',
						Guyana: '蓋亞那合作共和國',
						Suriname: '蘇利南共和國',
						Brazil: '巴西聯邦共和國',
						Ecuador: '厄瓜多',
						Peru: '秘魯',
						Bolivia: '玻利維亞',
						Paraguay: '巴拉圭',
						Uruguay: '烏拉圭',
						Argentina: '阿根廷',
						Chile: '智利',
						'Falkland Is.': '福克蘭群島',
						'S. Geo. and S. Sandw. Is.': '南喬治亞與南桑威奇群島',
						'Fr. S. Antarctic Lands': '法屬南部和南極領地',
						'Heard I. and McDonald Is.': '赫德島和麥克唐納群島',
						China: '中華民國',
					},
				},
			],
		};
		barChart.setOption(option);
	} catch (error) {
		console.error(error);
	}
};
// 重新調整圖表大小
const handleResize = () => {
	barChart?.resize();
};
const handleTabChange = () => {
	if (
		mapChart.value &&
		mapChart.value.clientWidth > 0 &&
		mapChart.value.clientHeight > 0
	) {
		initChart();
	}
};
onMounted(() => {
	// 圖表重新渲染
	const observer = new ResizeObserver(() => {
		handleResize();
		handleTabChange();
	});
	observer.observe(mapChart.value);
	initChart();
});

// 當數據變化時重新渲染圖表
watch([() => data, () => mapName], initChart, { deep: true });
</script>
<style scoped>
#mapChart {
	position: relative;
	height: 52vh;
	overflow: hidden;
}
</style>
