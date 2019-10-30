import React from 'react';
import { connect } from 'react-redux';

import ProductTable from './productTable/ProductTable';
import companyProfileSelectors from '../../../modules/companyProfile/companyProfileSelectors';
import { LoaderBlock } from '../../../components/ui-components/Layout/Loader';
import { fetchProducts } from '../../../modules/companyProfile/companyProfileActions';

function Products({ status, subjects, tags }) {
  return (
    <section className="content-body service-products">
      {status === 'success' && <ProductTable subjects={subjects} tags={tags} />}
      {status === 'request' && <LoaderBlock height="50vh" />}
    </section>
  );
}

const mapStateToProps = (state) => {
  const {
    status,
    data: { subjects, tags }
  } = companyProfileSelectors.products(state);

  return {
    status,
    subjects,
    tags
  };
};

const mapDispatchToProps = {
  fetchProducts
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Products);
