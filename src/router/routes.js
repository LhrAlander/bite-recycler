import WorkOrder from '@/pages/workOrder'
import InWorking from '@/pages/workOrder/InWorking'
import Stations from '@/pages/Stations/Stations'
import Station from '@/pages/Stations/StationDetail'
import Record from '@/pages/Records'
import Coin from '@/pages/Coins'
import Wallet from '@/pages/Wallet'
import Personal from '@/pages/Personal/Personal'
import Price from '@/pages/Price'

export default [
	{
		path: '/',
		component: WorkOrder
	},
	{
		name: 'workOrder',
		path: '/workOrder',
		component: WorkOrder
	},
	{
		name: 'inWorking',
		path: '/inWorking',
		component: InWorking
	},
	{
		name: 'stations',
		path: '/stations',
		component: Stations
	},
	{
		name: 'station',
		path: '/station',
		component: Station
	},
	{
		name: 'record',
		path: '/record',
		component: Record
	},
	{
		name: 'coin',
		path: '/coin',
		component: Coin
	},
	{
		name: 'wallet',
		path: '/wallet',
		component: Wallet
	},
	{
		name: 'personal',
		path: '/personal',
		component: Personal
	},
	{
		name: 'price',
		path: '/price',
		component: Price
	}
]