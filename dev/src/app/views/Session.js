LSCP.View.Session = Backbone.View.extend({

    el: "#session",

    config: null,
    current_game: null,
    current_game_session: null,
    current_game_view: null,

    initialize: function(){
        log('LSCP.View.Session initialized!');

        $.getJSON('data/config.json', this.onConfigLoaded.bind(this));
    },

    render: function(){
        return this;
    },

    onConfigLoaded: function(data){
        this.config = new LSCP.Model.Session(data);
        this.startSession();
    },

    startSession: function(){

        this.current_game_session = new LSCP.Model.GameSession(this.config.session);

        this.current_game = this.config.games.shift();
        this.current_game.game_session = this.current_game_session;

        this.current_game_session.set({
            game: this.current_game
        });

        switch (this.current_game.get('type')) {

            case 'WordComprehensionGame':
                this.current_game_view = new LSCP.View.WordComprehensionGame({
                    model: this.current_game
                });

        }

        this.$el.append(this.current_game_view.render().el);

        this.current_game_view.start();

    }
});