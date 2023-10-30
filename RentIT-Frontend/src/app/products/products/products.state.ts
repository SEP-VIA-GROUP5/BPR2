import {Product} from "src/model/product";
import {Action, State, StateContext} from "@ngxs/store";
import {Injectable} from "@angular/core";
import {NbToastrService} from "@nebular/theme";
import {produce} from "immer";
import {ICONS} from "src/app/constants";
import {environment} from "src/environments/environment.dev";
import {ProductsService} from "src/api/products.service";
import {
  ProductsByFilter,
  ProductsFetch,
  ProductsReset,
  ProductsResetFilter
} from "src/app/products/products/products.actions";
import {mapToMapperFromFilteringOptions} from "src/app/products/products/constants/constants";
import {mapsAreEqual} from "src/core/utils/maps.utils";
import {FilteringProductOptions} from "src/model/filteringProductOptions";

export interface ProductsStateModel {
  isFetching: boolean;
  products: Product[];
  productsOnFiltering: Product[];
  pageNumber: number;
  pageNumberOnFiltering: number;
  pageSize: number;
  pageSizeOnFiltering: number;
  endOfList: boolean;
  endOfListOnFiltering: boolean;
  currentFilteringOptions: FilteringProductOptions;
  isListOnFiltering: boolean;
}

export const defaultsState: ProductsStateModel = {
  isFetching: false,
  products: [],
  productsOnFiltering: [],
  pageNumber: 1,
  pageSize: 6,
  endOfList: false,
  pageNumberOnFiltering: 1,
  pageSizeOnFiltering: 6,
  endOfListOnFiltering: false,
  currentFilteringOptions: null,
  isListOnFiltering: false,
}

@State<ProductsStateModel>({
  name: 'productsPage',
  defaults: defaultsState,
})

@Injectable()
export class ProductsState {
  constructor(
    private toastrService: NbToastrService,
    private productsService: ProductsService,
  ) {
  }

  @Action(ProductsFetch)
  async productsFetch(
    {getState, setState}: StateContext<ProductsStateModel>) {

    let pageNumber = getState().pageNumber;
    let pageSize = getState().pageSize;
    let newState = produce(getState(), draft => {
      draft.isFetching = true;
    })
    setState(newState);

    let nextProducts: Product[] = [];

    try {
      nextProducts = await this.productsService.getProductsPerPage(pageNumber, pageSize);
    } catch (error) {
      this.toastrService.danger(
        environment.production ? 'Please contact the administration' : error,
        'Something went wrong',
        {icon: ICONS.ALERT_CIRCLE_OUTLINE}
      );
    }

    newState = produce(getState(), draft => {
      let currentProducts = draft.products;
      draft.products = [...currentProducts,...nextProducts];
      draft.pageNumber = pageNumber + 1;
      draft.endOfList = nextProducts.length !== draft.pageSize ;
      draft.isFetching = false;

      if(draft.isListOnFiltering) {
        // reset filtering functionality
        draft.isListOnFiltering = false;
        draft.productsOnFiltering = [];
        draft.pageNumberOnFiltering = 1;
        draft.endOfListOnFiltering = false;
      }
    })
    setState(newState);
  }

  @Action(ProductsByFilter)
  async productsByFilter(
    {getState, setState}: StateContext<ProductsStateModel>,
    action: ProductsByFilter) {

    let filteringOptionsFromAction = mapToMapperFromFilteringOptions(action.filteringProductOptions);
    if (filteringOptionsFromAction.size === 0) return getState();

    let pageNumberOnFiltering = getState().pageNumberOnFiltering;
    let pageSizeOnFiltering = getState().pageSizeOnFiltering;
    let currentFilteringOptions = mapToMapperFromFilteringOptions(getState().currentFilteringOptions);
    let newState = produce(getState(), draft => {
      draft.isFetching = true;
    });
    setState(newState);


    try {
      let nextProducts: Product[] = [];

      if (!mapsAreEqual(currentFilteringOptions, filteringOptionsFromAction)) {
        pageNumberOnFiltering = 1;
        nextProducts = await this.productsService.getPageOfFilteredProducts(pageNumberOnFiltering, pageSizeOnFiltering, filteringOptionsFromAction);
      }
      else {
        nextProducts = await this.productsService.getPageOfFilteredProducts(pageNumberOnFiltering, pageSizeOnFiltering, currentFilteringOptions);
      }

      if (!nextProducts) nextProducts = [];

      newState = produce(getState(), draft => {
        let currentProductsOnFiltering = draft.productsOnFiltering;
        draft.currentFilteringOptions = action.filteringProductOptions;
        draft.productsOnFiltering = [...currentProductsOnFiltering, ...nextProducts];
        draft.pageNumberOnFiltering = pageNumberOnFiltering + 1;
        draft.endOfListOnFiltering = nextProducts.length !== pageSizeOnFiltering;
        draft.isListOnFiltering = true;
        draft.isFetching = false;
      });
      return setState(newState);
    }
    catch (e) {
      newState = produce(getState(), draft => {
        draft.isFetching = false;
        this.toastrService.danger(
          environment.production ? 'Please contact the administration' : e,
          'Something went wrong',
          {icon: ICONS.ALERT_CIRCLE_OUTLINE}
        );
      });
      return setState(newState);
    }
  }

  @Action(ProductsResetFilter)
  async productsResetFilter(
    {getState, setState }: StateContext<ProductsStateModel>
  ) {
    setState(defaultsState);
    return await this.productsFetch({getState, setState} as StateContext<ProductsStateModel>);
  }

  @Action(ProductsReset)
  async productsReset(
    { setState }: StateContext<ProductsStateModel>) {
   setState(defaultsState);
  };
}
