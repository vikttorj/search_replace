import { html, css, unsafeCSS } from 'lit-element';
import { nothing } from 'lit-html';
import { BbvaTabDefault } from '@bbva-web-components/bbva-tab-default/index';
import { BbvaButtonDefault } from '@bbva-web-components/bbva-button-default/index';
import { PfmDashboardDetail } from '@bbva-web-components-widgets/pfm-dashboard-detail/index';
import { PfmSavingTools } from '@bbva-web-components-widgets/pfm-saving-tools/index';
import { BbvaWoodyPage } from '@bbva-es-mobile/bbva-woody-page';
import { BbvaFormRating } from '@bbva-web-components/bbva-form-rating/index';
import { pfmDashboardPageIndexStyles } from './pfm-dashboard-page-index-styles';
import { normalizeFinancialOverview } from '@bbva-es-mobile/bbva-woody-lit-utils';
import { default as pfmDashboardPageIndexDarkMode } from './pfm-dashboard-page-index-ambients';
import { bbvaMenu } from '@bbva-web-components/bbva-foundations-icons';

const APP_SETTINGS_ENDPOINT = {
	ei: 'GLOMO-ES-1.0-PRE_PROD',
	qa: 'GLOMO-ES-1.0-PROD',
	pro: 'GLOMO-ES-1.0-PROD',
	proxy: 'GLOMO-ES-1.0-PRE_PROD',
};
const ENTRY_GROUP = '101';
const SAVINGS_GROUP = '102';
const CATEGORIES_GROUP = {
	[ENTRY_GROUP]: '1',
	[SAVINGS_GROUP]: '2',
};

export class PfmDashboardPageIndex extends BbvaWoodyPage {
	static get is() {
		return 'pfm-dashboard-page-index';
	}

	static get scopedElements() {
		const components = {
			'bbva-tab-default': BbvaTabDefault,
			'bbva-button-default': BbvaButtonDefault,
			'pfm-dashboard-detail': PfmDashboardDetail,
			'pfm-saving-tools': PfmSavingTools,
			'bbva-form-rating': BbvaFormRating,
		};

		return BbvaWoodyPage.getScopedElements(components);
	}

	static get properties() {
		return {
			/**
			 * Necessary object data for widgets. It must contains net worth data, internal products and external products
			 * @default {}
			 */
			data: {
				type: Object,
			},

			/**
			 * Pfm id used by pfm-dashboard-detail
			 * widget to fetch expenses categorization
			 */
			pfmId: {
				type: String,
				attribute: 'pfm-id',
			},

			/**
			 * Property to show/hide
			 * proactivity card
			 */
			showProactivityCard: {
				type: Boolean,
				attribute: 'show-proactivity-card',
			},

			/**
			 * Property to navegate
			 * to forecast transactions or financial calendar
			 * @default false
			 */
			activeForecastTransactions: {
				type: Boolean,
				attribute: 'active-forecast-transactions',
			},

			/**
			 * cache key for data managers
			 */
			cacheKey: {
				type: String,
				attribute: 'cache-key',
			},

			/**
			 * Set initial tab
			 * for pfm-dashboard-detail
			 * carousel
			 * @default 0
			 */
			selectedTab: {
				type: Number,
				attribute: 'selected-tab',
			},

			/**
			 * Identifier of the taxonomic group for Expenses
			 * @default '103'
			 */
			expensesGroupId: {
				type: String,
				attribute: 'expenses-group-id',
			},

			/**
			 * Identifier of the taxonomic group for Incomes
			 * @default '101'
			 */
			incomesGroupId: {
				type: String,
				attribute: 'incomes-group-id',
			},

			/**
			 * Property to show/hide piggy banks link on saving tools
			 * @default false
			 */
			piggyBanksIsActive: {
				type: Boolean,
				attribute: 'piggy-banks-is-active',
			},

			/**
			 * Property to show/hide piggy banks link on saving tools
			 * @default false
			 */
			piggyBanksEntryPoint: {
				type: Boolean,
				attribute: 'piggy-banks-entry-point',
			},

			/**
			 * Property to show/hide budgets link on saving tools
			 * @default false
			 */
			budgetsIsActive: {
				type: Boolean,
				attribute: 'budgets-is-active',
			},

			/**
			 * Property to show/hide goals link on saving tools
			 * @default false
			 */
			goalsIsActive: {
				type: Boolean,
				attribute: 'goals-is-active',
			},

			/**
			 * Property to show/hide forescating link
			 * @default false
			 */
			forecastingIsActive: {
				type: Boolean,
				attribute: 'forecasting-is-active',
			},

			/**
			 * Property to show/hide recurring expenses link
			 * @default false
			 */
			recurringExpensesIsActive: {
				type: Boolean,
				attribute: 'recurring-expenses-is-active',
			},

			/**
			 * from operation date
			 * of pfm period
			 */
			fromOperationDate: {
				type: String,
				attribute: 'from-operation-date',
			},

			/**
			 * to operation date
			 * of pfm period
			 */
			toOperationDate: {
				type: String,
				attribute: 'to-operation-date',
			},

			/**
			 * Property to balanece frequency
			 */
			frequency: {
				type: String,
				attribute: 'frequency',
			},

			/**
			 * Property to show/hide header back icon
			 * @default false
			 */
			showBackIcon: {
				type: Boolean,
				attribute: 'show-back-icon',
			},

			/**
			 * list options to show in saving tools
			 * @default []
			 */
			listToolsOptions: {
				type: Array,
				attribute: 'list-tools-options',
			},

			/**
			 * Show/hide feedback
			 */
			showFeedbackButton: {
				type: Boolean,
				attribute: 'show-feedback-button',
			},

			/**
			 * Number of piggy banks
			 */
			piggyBanksCounts: {
				type: Number,
				attribute: 'piggy-banks-counts',
			}
		};
	}

	static get styles() {
		return [
			super.styles,
			css`
				${unsafeCSS(pfmDashboardPageIndexStyles)}
			`,
		];
	}

	get darkModeStyles() {
		return [pfmDashboardPageIndexDarkMode];
	}

	get _internalProducts() {
		return this.data?.internalProducts && normalizeFinancialOverview(this.data.internalProducts);
	}

	get pageContent() {
		return html`<pfm-dashboard-detail
				woody-feature
                text_to_search="value_propr"
                .text_to_search="value_propr"
				.config="${this.config}"
				.publicSettingsHost="${this.getHost('VDC_APP_SETTINGS')}"
				show-net-worth-balance
				?show-forecasting-link="${this.forecastingIsActive}"
				?show-recurring-expenses-link="${this.recurringExpensesIsActive}"
				?show-proactivity-card="${this.showProactivityCard}"
				public-settings-id="${APP_SETTINGS_ENDPOINT[this._env] || APP_SETTINGS_ENDPOINT.ei}"
				pfm-key-settings="PFM_dashboard_chart_configuration"
				cache-type="SESSION"
				?discreet-mode="${this.discreetModeActive}"
				pfms-cache-key="${`GET_pfms_${this.cacheKey}`}"
				pfm-balances-cache-key="${`GET_pfm_balances_${this.cacheKey}`}"
				forecast-balances-cache-key="${`GET_forecast_balances_${this.cacheKey}`}"
				required-token="tsec"
				pfm-id="${this.pfmId}"
				expenses-group-id="${this.expensesGroupId}"
				incomes-group-id="${this.incomesGroupId}"
				selected-tab="${this.selectedTab}"
				host="${this._dataProviderHost}"
				language="${this.language}"
				.internalProducts="${this._internalProducts}"
				.externalProducts="${this.data.externalProducts}"
				see-more-aria-label="${this.t('label.goToCategory')}"
				ambient="light"
				@pfm-dashboard-detail-config-link-select="${() => this._transitionToExternal('configurate-products')}"
				@pfm-dashboard-detail-forecasting-link-select="${this._handleForecastingTransition}"
				@pfm-dashboard-detail-recurring-expenses-link-select="${this._handleNavigationRecurringExpenses}"
				@proactivity-message-execute="${(ev) => this._handleFactDetailShow(ev, 'DAYTODAY')}"
				@pfm-dashboard-detail-show-more-select="${this._handleShowMorePfmTransition}"
				@pfm-dashboard-detail-category-select="${this._handleChartItemSelectTransition}"
			>
			</pfm-dashboard-detail>
			<pfm-saving-tools
				.publicSettingsHost="${this.getHost('VDC_APP_SETTINGS')}"
				pfm-id="${this.pfmId}"
				host="${this._dataProviderHost}"
				.listToolsOptions="${this.listToolsOptions}"
				expenses-group-id="${this.expensesGroupId}"
				incomes-group-id="${this.incomesGroupId}"
				required-token="tsec"
				?discreet-mode="${this.discreetModeActive}"
				frequency="${this.frequency}"
				from-operation-date="${this.fromOperationDate}"
				to-operation-date="${this.toOperationDate}"
				pfm-balances-cache-key="${`GET_pfm_balances_${this.cacheKey}`}"
				pfm-piggy-banks-cache-key="${`GET_pfm_piggy_banks_${this.cacheKey}`}"
				language="${this.language}"
			>
			</pfm-saving-tools>
			${this.feedback}`;
	}

	constructor() {
		super();
		this.toggleMenu = true;
		this.showProactivityCard = false;
		this.activeForecastTransactions = false;
		this.recurringExpensesIsActive = false;
		this.forecastingIsActive = false;
		this.piggyBanksIsActive = false;
		this.budgetsIsActive = false;
		this.goalsIsActive = false;
		this.showBackIcon = false;
		this.piggyBanksEntryPoint = false;
		this.selectedTab = 0;
		this.expensesGroupId = '103';
		this.incomesGroupId = '101';
		this.listToolsOptions = [];

		const buttons = this._getContextualHelp()
			? [
					{
						id: 'btn-help',
						name: 'Help',
						icon: this._getContextualHelpIcon(),
						accessibilityText: this.t('accessibility.header.help'),
						label: this.t('accessibility.header.labels.help'),
					},
			  ]
			: [];

		buttons.push({
			id: 'btn-menu',
			name: 'Menu',
			icon: bbvaMenu(),
			accessibilityText: this.t('accessibility.header.menu'),
			label: this.t('accessibility.header.labels.menu'),
		});

		this.config = {
			header: {
				'@header-main-icon-click': ({ detail: { index } }) => {
					if (index === 0) {
						this._woodyFeature.dispatchEvent(new CustomEvent('navigation-go-back', { composed: true, bubbles: true, detail: true }));
					}
					if (index === 1) {
						if (this._getContextualHelp()) {
							this._openContextualHelp();
						} else {
							this._openWoodyMenu();
						}
					}
					if (index === 2) {
						// si no hay ayuda contextual nunca llega este índice
						this._openWoodyMenu();
					}
				},
				variant: 'first-level-sequential',
				showLeftIcon: true,
				leftIconLabel: this.t('accessibility.header.labels.back'),
				leftIconAriaLabel: this.t('accessibility.header.back'),
				position: 'fixed',
				buttons,
				id: 'main-header',
				text: this.t('label.financialHealth'),
			},
		};
	}

	get feedback() {
		return this.showFeedbackButton
			? html`
					<bbva-form-rating
						content-title="${this.t('label.titleYourFeedbackStar')}"
						accessibility-text="${this.t('label.selectOption')}"
					></bbva-form-rating>
			  `
			: nothing;
	}

	firstUpdated() {
		super.firstUpdated();
		if (!this.listToolsOptions.length) {
			if (this.piggyBanksIsActive && this.piggyBanksEntryPoint) {
				this.listToolsOptions.push({
					id: 'PiggyBanks',
					microillustration: 'wallet',
					badgeText: 'pfm-saving-tools-piggybanks-total-elements',
					elements: this.piggyBanksCounts || 0,
				});
			}
			if (this.budgetsIsActive) {
				this.listToolsOptions.push({
					id: 'Budgets',
					microillustration: 'walletmoney',
					badgeText: 'pfm-saving-tools-budgets-total-elements',
					elements: 0,
				});
			}
			if (this.goalsIsActive) {
				this.listToolsOptions.push({
					id: 'Goals',
					microillustration: 'addgoals',
				});
			}
			this.listToolsOptions.push({
				id: 'Program',
				microillustration: 'programyouraccount',
			});
		}
	}

	_handleNavigationRecurringExpenses() {
		this._transitionToExternal('pfm-recurring-expenses', {
			queryParams: {
				firstPage: 'showPendingPaid',
			},
		});
	}

	_handleShowMorePfmTransition(ev) {
		this._transitionToExternal('pfm-brands', {
			queryParams: {
				groupId: ev.detail.groupid,
			},
		});
	}

	_handleFactDetailShow(ev, origin) {
		this._transitionToExternal('feed-detail', {
			queryParams: {
				id: ev.detail?.relevantFactId,
				origin,
			},
		});
	}

	_handleChartItemSelectTransition(ev) {
		const {
			detail: { categoryid, subcategoryid, groupid },
		} = ev;
		const queryParams = {
			groupId: groupid,
		};

		if (categoryid && categoryid !== 'undefined') {
			queryParams.categoryId = categoryid;
		}

		if (subcategoryid && subcategoryid !== 'undefined') {
			queryParams.subcategoryId = subcategoryid;

			if (groupid === SAVINGS_GROUP || groupid === ENTRY_GROUP) {
				queryParams.categoryId = CATEGORIES_GROUP[groupid];
			}
		}

		this.dispatchEvent(
			new CustomEvent('pfm-dashboard-page-index-category-transition', {
				bubbles: true,
				composed: true,
				detail: { categoryid },
			})
		);

		this._transitionToExternal('pfm-brands', { queryParams });
	}

	_handleForecastingTransition() {
		this._dispatchCustomEvent('pfm-dashboard-page-index-forecasting-transition');

		if (this.activeForecastTransactions) {
			this._transitionToExternal('pfm-forecast-transactions');
		} else {
			this._transitionToExternal('financial-calendar');
		}
	}

	_dispatchCustomEvent(eventName, detail = true, bubbles = true, composed = true) {
		this.dispatchEvent(new CustomEvent(eventName, { detail, bubbles, composed }));
	}
}

customElements.define(PfmDashboardPageIndex.is, PfmDashboardPageIndex);
