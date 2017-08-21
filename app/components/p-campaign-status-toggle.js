import Ember from 'ember'

export default Ember.Component.extend({

  isPublished: function() {
    return this.get('campaign.state') === 'published'
  }.property('campaign.state'),

  isDraft: function() {
    return this.get('campaign.state') === 'draft'
  }.property('campaign.state'),

  isPending: function() {
    return this.get('campaign.state') === 'pending'
  }.property('campaign.state'),

  isTrash: function() {
    return this.get('campaign.state') === 'trash'
  }.property('campaign.state'),

  isPrivate: function() {
    return this.get('campaign.state') === 'private'
  }.property('campaign.state'),

  actions: {
    changeCampaignState(campaign, state) {
      campaign.set('state', state)
    }
  }

})
