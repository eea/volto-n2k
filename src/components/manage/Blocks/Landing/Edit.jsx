import React from 'react';
import { connect } from 'react-redux';
import { Grid, Button } from 'semantic-ui-react';
import { isEmpty } from 'lodash';
import EditBlockWrapper from './EditBlockWrapper';
import { emptyBlocksForm } from '@plone/volto/helpers';
import {
  SidebarPortal,
  UniversalLink,
  BlocksForm,
  Icon,
} from '@plone/volto/components';
import InlineForm from '@plone/volto/components/manage/Form/InlineForm';
import config from '@plone/volto/registry';
import settingsSVG from '@plone/volto/icons/settings.svg';
import DefaultView from './DefalutView';
import getSchema from './schema';
import hiker from './images/hiker.webp';
import { tileProps, getStyle } from './index';
import './style.less';

const Edit = (props) => {
  const schema = getSchema();
  const blocksState = React.useRef({});
  const [activeBlock, setActiveBlock] = React.useState(null);
  const {
    block = null,
    data = {},
    manage = false,
    selected = false,
    onChangeBlock = () => {},
  } = props;
  const { useDefault = true, tiles = [] } = data;
  const metadata = props.metadata || props.properties;
  const blocksData = data?.data || emptyBlocksForm();

  React.useEffect(() => {
    if (isEmpty(data?.data)) {
      onChangeBlock(block, {
        ...data,
        data: {
          ...blocksData,
        },
      });
    }
    /* eslint-disable-next-line */
  }, []);

  const handleKeyDown = (
    e,
    index,
    block,
    node,
    {
      disableEnter = false,
      disableArrowUp = false,
      disableArrowDown = false,
    } = {},
  ) => {
    if (e.key === 'ArrowUp' && !disableArrowUp && !activeBlock) {
      props.onFocusPreviousBlock(block, node);
      e.preventDefault();
    }
    if (e.key === 'ArrowDown' && !disableArrowDown && !activeBlock) {
      props.onFocusNextBlock(block, node);
      e.preventDefault();
    }
    if (e.key === 'Enter' && !disableEnter && !activeBlock) {
      props.onAddBlock(config.settings.defaultBlockType, index + 1);
      e.preventDefault();
    }
  };

  const onChangeField = (id, value) => {
    // special handling of blocks and blocks_layout
    if (['blocks', 'blocks_layout'].indexOf(id) > -1) {
      blocksState.current[id] = value;
      onChangeBlock(block, {
        ...data,
        data: {
          ...(data?.data || {}),
          ...blocksState.current,
        },
      });
    }
  };

  return (
    <>
      {useDefault ? (
        <DefaultView {...props} />
      ) : (
        <div
          className="landing-page-wrapper full-width edit"
          style={getStyle(props)}
          role="presentation"
          onKeyDown={(e) => {
            handleKeyDown(e, props.index, props.block, props.blockNode.current);
          }}
          // The tabIndex is required for the keyboard navigation
          /* eslint-disable jsx-a11y/no-noninteractive-tabindex */
          tabIndex={-1}
        >
          <Grid className="landing-page" container columns="12">
            <Grid.Row>
              <Grid.Column
                className="landing-page-description"
                widescreen="6"
                largeScreen="6"
                computer="6"
                tablet="12"
                mobile="12"
              >
                <BlocksForm
                  allowedBlocks={data?.allowedBlocks}
                  description={data?.instrunctions?.data}
                  manage={manage}
                  metadata={metadata}
                  pathname={props.pathname}
                  properties={blocksData}
                  selected={selected}
                  selectedBlock={selected && activeBlock ? activeBlock : null}
                  title={data?.placeholder}
                  onChangeField={onChangeField}
                  onChangeFormData={(newFormData) => {
                    onChangeBlock(block, {
                      ...data,
                      data: {
                        ...(data?.data || {}),
                        ...(newFormData.blocks_layout.items.length > 0
                          ? newFormData
                          : emptyBlocksForm()),
                      },
                    });
                  }}
                  onSelectBlock={(id) => {
                    if (activeBlock !== id) {
                      setActiveBlock(id);
                    }
                  }}
                >
                  {({ draginfo }, editBlock, blockProps) => {
                    return (
                      <EditBlockWrapper
                        blockProps={blockProps}
                        draginfo={draginfo}
                        extraControls={
                          <>
                            <>
                              <Button
                                icon
                                basic
                                title="Settings"
                                onClick={() => {
                                  setActiveBlock(null);
                                }}
                              >
                                <Icon
                                  name={settingsSVG}
                                  className=""
                                  size="19px"
                                />
                              </Button>
                            </>
                          </>
                        }
                      >
                        {editBlock}
                      </EditBlockWrapper>
                    );
                  }}
                </BlocksForm>
              </Grid.Column>
              <Grid.Column
                className="landing-page-tiles"
                widescreen="6"
                largeScreen="6"
                computer="6"
                tablet="5"
                mobile="7"
              >
                <Grid style={{ justifyContent: 'space-around' }}>
                  {tiles.map((item, index) => (
                    <Grid.Column
                      key={`item-${index}`}
                      className="item"
                      {...tileProps}
                    >
                      <UniversalLink href={item.link || '#'} title={item.title}>
                        <img
                          className="image"
                          src={`${item.image}/@@images/image`}
                          alt={item.title}
                        />
                        <p className="description">{item.description}</p>
                      </UniversalLink>
                    </Grid.Column>
                  ))}
                </Grid>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <img className="slick-image" src={hiker} alt="Hiker" />
        </div>
      )}

      <SidebarPortal selected={props.selected}>
        <InlineForm
          schema={schema}
          title={schema.title}
          onChangeField={(id, value) => {
            onChangeBlock(props.block, {
              ...props.data,
              [id]: value,
            });
          }}
          formData={props.data}
        />
      </SidebarPortal>
    </>
  );
};

export default connect((state) => ({
  navigation: state.navigation,
  screen: state.screen,
}))(Edit);
