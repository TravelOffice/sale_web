import { QuotePresenter } from '@adapter/presenters/interfaces/QuotePresenter';

export default class QuotePresenterImpl implements QuotePresenter {
    getListByOpportunity = async (leadId: string, opportunity: string) => Promise.resolve(undefined)
}
